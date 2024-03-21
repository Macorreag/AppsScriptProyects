function getUser() {
  var userEmail = 'macorreag@unal.edu.co';
  var user = AdminDirectory.Users.get(userEmail);
  Logger.log('User data:\n%s', JSON.stringify(user, null, 2));
} 