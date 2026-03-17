import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { Router } from '@angular/router';
import { ValidatorService } from '../../services/validator-service';
import { ErrorsService } from '../../services/error-service';

@Component({
  selector: 'app-registro-screen',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './registro-screen.html',
  styleUrl: './registro-screen.scss',
})
export class RegistroScreen implements OnInit {

  /* =========================
     Estado
     ========================= */
  public user: any = {};
  public errors: any = {};
  public isLoading = false;

  /* Password */
  public hide_1 = true;
  public inputType_1: 'password' | 'text' = 'password';

  /* Edades */
  public edades: Array<{ value: number }> = [];

  /* Estados de México */
  public estados: string[] = [
  'Aguascalientes','Baja California','Baja California Sur','Campeche',
  'Chiapas','Chihuahua','CDMX','Coahuila','Colima','Durango','Estado de México',
  'Guanajuato','Guerrero','Hidalgo','Jalisco','Michoacán','Morelos','Nayarit',
  'Nuevo León','Oaxaca','Puebla','Querétaro','Quintana Roo','San Luis Potosí',
  'Sinaloa','Sonora','Tabasco','Tamaulipas','Tlaxcala','Veracruz','Yucatán','Zacatecas'
];

  constructor(
    private readonly router: Router,
    private readonly validator: ValidatorService,
    private readonly errorService: ErrorsService
  ) {}

  ngOnInit(): void {
    // Initialization logic here
    // Se inia el array de edades para el select del formulario de registro.
    this.llenarArrayEdades();
  }

  private llenarArrayEdades(): void {
    // Igual a su lógica original (18..80)
    this.edades = Array.from({ length: 63 }, (_, i) => ({ value: i + 18 }));
  }

  public terminosCondiciones(): void {
    // Aquí puede abrir modal / navegar / etc.
    alert('Aquí se mostrarán los Términos y Condiciones.');
  }

  public registrar(): void {
  if (this.isLoading) return;

  this.errors = {};

  // Nombre
  if (!this.validator.required(this.user.first_name)) {
    this.errors.first_name = this.errorService.required;
  } else if (!this.validator.wordsES(this.user.first_name)) {
    this.errors.first_name = this.errorService.msg('pattern', 'Juan');
  }

  // Apellidos
  if (!this.validator.required(this.user.last_name)) {
    this.errors.last_name = this.errorService.required;
  } else if (!this.validator.wordsES(this.user.last_name)) {
    this.errors.last_name = this.errorService.msg('pattern', 'Pérez');
  }

  // Email
  if (!this.validator.required(this.user.email)) {
    this.errors.email = this.errorService.required;
  } else if (!this.validator.email(this.user.email)) {
    this.errors.email = this.errorService.email;
  }

  // Password
  if (!this.validator.required(this.user.password)) {
    this.errors.password = this.errorService.required;
  } else if (!this.validator.minLen(this.user.password, 6)) {
    this.errors.password = this.errorService.msg('min', 6);
  }

  // Edad
  if (!this.validator.betweenNumber(this.user.edad, 18, 80)) {
    this.errors.edad = this.errorService.msg('between', 18, 80);
  }

  // Teléfono
  if (!this.validator.phoneMX(this.user.telefono)) {
    this.errors.telefono = this.errorService.msg('pattern', '2221234567');
  }

  // ID usuario
  if (!this.validator.required(this.user.id_usuario)) {
    this.errors.id_usuario = this.errorService.required;
  } else if (!this.validator.idUser(this.user.id_usuario)) {
    this.errors.id_usuario = this.errorService.alphanumeric;
  } else if (!this.validator.lenBetween(this.user.id_usuario, 8, 8)) {
    this.errors.id_usuario = this.errorService.msg('exact', 8);
  }

  // Confirmar contraseña
  if (this.user.password !== this.user.confirm_password) {
    this.errors.confirm_password = this.errorService.passwordMatch;
  }

  // CURP
  if (!this.validator.curp(this.user.curp)) {
    this.errors.curp = this.errorService.curp;
  }

  // RFC
  if (!this.validator.rfc(this.user.rfc)) {
    this.errors.rfc = this.errorService.rfc;
  }

  // Dirección
  if (!this.validator.required(this.user.direccion)) {
    this.errors.direccion = this.errorService.required;
  }

  // Grado
  if (!this.validator.required(this.user.grado)) {
    this.errors.grado = this.errorService.required;
  }

  // Estado
  if (!this.validator.required(this.user.estado)) {
    this.errors.estado = this.errorService.required;
  }

  if (Object.keys(this.errors).length > 0) return;

  this.isLoading = true;

  console.log('Registro válido:', this.user);
}

  public goLogin(): void {
    this.router.navigate(['']); // ajuste según su app
  }

  public showPassword(): void {
    this.hide_1 = !this.hide_1;
    this.inputType_1 = this.hide_1 ? 'password' : 'text';
  }

  

}
