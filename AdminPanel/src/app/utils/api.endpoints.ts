export class ApiEndPoints {
  public static get signup(): string {
    return 'signup';
  }
  public static get login(): string {
    return 'login';
  }
  public static get forgotPassword(): string {
    return 'forgot-password';
  }
  public static get logout(): string {
    return 'logout';
  }
  public static get listUsers(): string {
    return 'list-user';
  }
  public static get searchUsers(): string {
    return 'fetch-user';
  }
  public static get searchAdmin(): string {
    return 'fetch-admin';
  }
  public static get resetPassword(): string {
    return 'reset/';
  }
  public static get listalladmin(): string {
    return 'list-admin';
  }
  public static get changeUserRole(): string {
    return 'toggle-role';
  }
  public static get Enable2Fa(): string {
    return 'enable-2fa';
  }
  public static get disable2Fa(): string {
    return 'disable-2fa';
  }

  public static get ConfirmEnable2Fa(): string {
    return 'confirm-enable-2fa';
  }
  public static get loginOTP(): string {
    return 'login-otp';
  }
  public static get allUserCount(): string {
    return 'total-user-number';
  }
  public static get allUserLoggedInCount(): string {
    return 'loggedin-user-number';
  }
  public static get varifiedUserCount(): string {
    return 'verified-user-number';
  }
  public static get totalAdminCount(): string {
    return 'total-admin-number';
  }
  public static get totalAdminLoggedInCount(): string {
    return 'loggedin-admin-number';
  }
  public static get deleteUser(): string {
    return 'delete-user';
  }
  public static get deleteAdmin(): string {
    return 'delete-admin';
  }
}
