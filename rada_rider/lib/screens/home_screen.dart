import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../services/auth_service.dart';
import '../services/order_service.dart';
import '../services/location_service.dart';
import '../theme/app_colors.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final AuthService _authService = AuthService();
  final OrderService _orderService = OrderService();
  final LocationService _locationService = LocationService();
  
  bool _isOnline = false;

  void _logout() async {
    _locationService.stopTracking(); // Ensure tracking stops on logout
    await _authService.signOut();
  }

  void _toggleOnline() async {
    setState(() {
      _isOnline = !_isOnline;
    });

    if (_isOnline) {
      await _locationService.startTracking();
    } else {
      _locationService.stopTracking();
    }
  }

  void _handleAccept(String orderId) async {
    await _orderService.updateOrderStatus(orderId, 'in_transit');
    // Ensure tracking is on when accepting an order
    if (!_isOnline) {
       _toggleOnline();
    }
  }

  void _handleComplete(String orderId) async {
    await _orderService.updateOrderStatus(orderId, 'delivered');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Rada Rider'),
        backgroundColor: AppColors.surface,
        actions: [
          Row(
            children: [
              Text(_isOnline ? 'Online' : 'Offline', 
                style: TextStyle(
                  color: _isOnline ? AppColors.success : AppColors.textSecondary,
                  fontWeight: FontWeight.bold
                )
              ),
              Switch(
                value: _isOnline,
                onChanged: (_) => _toggleOnline(),
                activeColor: AppColors.success,
              ),
            ],
          ),
          IconButton(onPressed: _logout, icon: const Icon(Icons.logout)),
        ],
      ),
      body: StreamBuilder<QuerySnapshot>(
        stream: _orderService.getAvailableOrders(),
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}', style: TextStyle(color: Colors.red)));
          }

          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          final docs = snapshot.data?.docs ?? [];

          if (docs.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.check_circle_outline, size: 64, color: AppColors.textSecondary),
                  SizedBox(height: 16),
                  Text(
                    _isOnline ? 'Waiting for orders...' : 'Go Online to allow tracking',
                    style: TextStyle(color: AppColors.textSecondary, fontSize: 18),
                  ),
                ],
              ),
            );
          }

          var orderData = docs.first.data() as Map<String, dynamic>;
          String orderId = docs.first.id;
          String status = orderData['status'] ?? 'pending';

          return Padding(
            padding: const EdgeInsets.all(16.0),
            child: Card(
              color: AppColors.surface,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Active Order', style: TextStyle(color: AppColors.textSecondary)),
                    SizedBox(height: 8),
                    Text(
                      orderData['customerName'] ?? 'Unknown Customer',
                      style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                    Text(
                      orderData['address'] ?? 'No Address',
                      style: TextStyle(color: Colors.white70),
                    ),
                    Divider(color: AppColors.border),
                    Text(
                      orderData['description'] ?? '',
                      style: TextStyle(color: Colors.white),
                    ),
                    SizedBox(height: 24),
                    if (status == 'pending')
                      ElevatedButton(
                        onPressed: () => _handleAccept(orderId),
                         style: ElevatedButton.styleFrom(
                          backgroundColor: AppColors.primary,
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                        ),
                        child: Container(width: double.infinity, alignment: Alignment.center, child: Text('Accept & Transport', style: TextStyle(color: Colors.white, fontSize: 16))),
                      )
                    else if (status == 'in_transit')
                      ElevatedButton(
                        onPressed: () => _handleComplete(orderId),
                         style: ElevatedButton.styleFrom(
                          backgroundColor: AppColors.success,
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                        ),
                        child: Container(width: double.infinity, alignment: Alignment.center, child: Text('Mark Delivered', style: TextStyle(color: Colors.white, fontSize: 16))),
                      )
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
