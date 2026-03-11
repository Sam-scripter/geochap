import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";

const formSchema = z.object({
    customerName: z.string().min(2, "Name must be at least 2 characters"),
    customerPhone: z.string().min(10, "Phone must be at least 10 characters"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    description: z.string().optional(),
});

interface OrderFormProps {
    onSuccess?: () => void;
}

export function OrderForm({ onSuccess }: OrderFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here (e.g. restrict to Kenya) */
            componentRestrictions: { country: "ke" },
        },
        debounce: 300,
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customerName: "",
            customerPhone: "",
            address: "",
            description: "",
        },
    });

    const handleSelect = async (address: string) => {
        setValue(address, false);
        clearSuggestions();
        form.setValue("address", address); // Sync with react-hook-form

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            setCoordinates({ lat, lng });
            console.log("📍 Coordinates:", { lat, lng });
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "orders"), {
                ...values,
                location: coordinates || null, // Save lat/lng
                status: "pending",
                createdAt: serverTimestamp(),
                assignedTo: null,
            });
            toast.success("Order created successfully");
            form.reset();
            setValue(""); // Clear autocomplete
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error("Error adding document: ", error);
            toast.error("Failed to create order");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Customer Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="customerPhone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="+254..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Autocomplete Address Field */}
                <FormItem className="relative">
                    <FormLabel>Delivery Address</FormLabel>
                    <FormControl>
                        <Input
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                form.setValue("address", e.target.value); // Manual typing fallback
                            }}
                            disabled={!ready}
                            placeholder="Start typing location..."
                        />
                    </FormControl>

                    {/* Suggestions Dropdown */}
                    {status === "OK" && (
                        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg">
                            <Command>
                                <CommandList>
                                    <CommandGroup>
                                        {data.map(({ place_id, description }) => (
                                            <CommandItem
                                                key={place_id}
                                                onSelect={() => handleSelect(description)}
                                                className="cursor-pointer hover:bg-gray-100 p-2"
                                            >
                                                {description}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </div>
                    )}
                    <FormMessage />
                </FormItem>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description / Items</FormLabel>
                            <FormControl>
                                <Textarea placeholder="2 boxes of..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Order"}
                </Button>
            </form>
        </Form>
    );
}
