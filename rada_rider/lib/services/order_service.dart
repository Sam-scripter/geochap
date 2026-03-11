import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class OrderService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance;

  Stream<QuerySnapshot> getAvailableOrders() {
    String? uid = _auth.currentUser?.uid;
    if (uid == null) return const Stream.empty();

    // Listen for orders assigned to this rider that are NOT delivered
    return _db
        .collection('orders')
        .where('assignedTo', isEqualTo: uid)
        .where('status', isNotEqualTo: 'delivered')
        .snapshots();
  }

  Future<void> updateOrderStatus(String orderId, String status) async {
    await _db.collection('orders').doc(orderId).update({
      'status': status,
      'updatedAt': FieldValue.serverTimestamp(),
    });
  }
}
