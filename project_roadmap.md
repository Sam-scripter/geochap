# Rada Project Roadmap

This roadmap breaks the Rada delivery tracking project into three distinct phases. Each phase delivers a complete, testable prototype with increasing complexity.

## Phase 1: The "Digital Dispatch" Loop (Data Connectivity)
**Goal:** Replace the "phone call" with a digital flow. Manager creates order -> Rider accepts -> Customer sees text-based status.

### 1.1 Manager Dashboard (React) - `rada-route-ace`
- [ ] **Infrastructure**: Install and initialize `firebase` SDK.
- [ ] **Auth**: Implement simple Email/Password login for managers.
- [ ] **Data Model**: Define Firestore schema for `orders` and `riders`.
- [ ] **Create Order UI**: Build a form to manually input:
    - Customer Name
    - Customer Phone
    - Description (e.g., "Food Package")
    - Text Address (e.g., "Westlands, near Mall")
- [ ] **Dispatch UI**:
    - List active orders.
    - Dropdown to assign an order to a Rider.
    - Real-time updates (via Firestore listeners) of order status.

### 1.2 Rider App (Flutter) - `rada_rider`
- [ ] **Infrastructure**: Install `firebase_core`, `firebase_auth`, `cloud_firestore`.
- [ ] **Auth**: Login screen for riders.
- [ ] **Refactor**: Split `main.dart` into manageable screens.
- [ ] **Order List**: Stream Firestore orders where `assignedTo == myUserId`.
- [ ] **Actions**:
    - "Accept" / "Reject" buttons.
    - Status toggle: "Picked Up" -> "In Transit" -> "Delivered".

### 1.3 Customer View (Web Lite)
- [ ] **Infrastructure**: Create a simple public route e.g., `/track/:orderId`.
- [ ] **Read-Only Interface**:
    - Fetch order details by ID from Firestore.
    - Display current status (e.g., "Rider is on the way").
    - **No Map yet**, just establishing the data pipeline.

---

## Phase 2: "The Moving Dot" (Real-Time Location)
**Goal:** Enable the "Uber-like" experience with live GPS updates.

### 2.1 Rider App (Flutter)
- [ ] **Permissions**: Request Always-On Location permissions.
- [ ] **Infrastructure**: Install `geolocator` and `firebase_database` (RTDB).
- [ ] **Background Service**:
    - Implement a service to capture GPS even when app is minimized.
    - Write logic: `If (Order is Active) -> Write Lat/Lng to RTDB/riders/{id}`.

### 2.2 Manager Dashboard (React)
- [ ] **Map Integration**: Add Google Maps / Mapbox GL JS.
- [ ] **Visualization**:
    - Render map markers for all active riders.
    - Subscribe to RTDB for smooth icon movement.

### 2.3 Customer View
- [ ] **Map Component**: Show a map with two pins:
    - **Rider**: Live position from RTDB.
    - **Destination**: Static marker (approximated for now).
- [ ] **Live Updates**: Watch the rider icon move towards the destination.

---

## Phase 3: Intelligence & Automation (The "Smoothness")
**Goal:** Reduce friction, handle edge cases, and polish the UX.

### 3.1 Smart Data Entry
- [ ] **Address Resolution**: Integrate Google Places Autocomplete in Dashboard to get precise Lat/Lng for Pickup/Dropoff.
- [ ] **Distance Matrix**: Calculate estimated travel time (ETA) based on routes.

### 3.2 Automated Communications
- [ ] **Notifications**: Implement Firebase Cloud Messaging (FCM) to alert Rider of new assignments.
- [ ] **SMS**: Integrate Twilio or Africa's Talking.
    - Trigger: When "Picked Up" -> Send SMS to Customer with tracking link.
- [ ] **Interactivity**: Add "Call Rider" button for managers.

### 3.3 The "Nairobi Problem" (Location Pinning)
- [ ] **Refinement**: If location is vague, Customer View allows user to "Pin my exact location" on the map.
- [ ] **Feedback Loop**: Update the order's dropoff coordinates in Firestore.
