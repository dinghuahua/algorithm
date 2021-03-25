// var getIntersectionNode = function (headA, headB) {
//   let a = headA;
//   let b = headB;
//   if (!headB || !headA) return null;
//   while (a !== b) {
//     if (!a.next && !b.next) return null;
//     a = a.next ? a.next : headB;
//     b = b.next ? b.next : headA;
//   }
//   return a
// };
// var getIntersectionNode = function (headA, headB) {
//   let pa = headA;
//   let pb = headB;
//   while (pa !== pb) {
//     pa = pa ? pa.next : headB;
//     pb = pb ? pb.next : headA;
//   }
//   return pa;
// };
