import { Injectable } from '@angular/core';

export type ErrorKey =
  | 'generic'
  | 'required'
  | 'numeric'
  | 'betweenDate'
  | 'email'
  | 'between'
  | 'max'
  | 'min'
  | 'exact'
  | 'pattern'
  | 'alphanumeric'
  | 'textOnly'
  | 'curp'
  | 'rfc'
  | 'passwordMatch'
  | 'noSpaces';

@Injectable({
  providedIn: 'root',
})
export class ErrorsService {
  private readonly messages = {
    generic: 'Favor de verificar: el dato introducido no es válido.',
    required: 'Campo requerido.',
    numeric: 'Solo se aceptan valores numéricos.',
    betweenDate: 'La fecha no es válida.',
    email: 'Favor de introducir un correo con formato válido.',
    alphanumeric: 'Solo se permiten letras y números, sin espacios.',
    textOnly: 'Solo se permiten letras.',
    curp: 'La CURP no es válida.',
    rfc: 'El RFC no es válido.',
    passwordMatch: 'Las contraseñas no coinciden.',
    noSpaces: 'No se permiten espacios.',
  } as const;

  public msg(key: 'generic' | 'required' | 'numeric' | 'betweenDate' | 'email' | 'alphanumeric' | 'textOnly' | 'curp' | 'rfc' | 'passwordMatch' | 'noSpaces'): string;
  public msg(key: 'between', min: number, max: number): string;
  public msg(key: 'max' | 'min' | 'exact', size: number): string;
  public msg(key: 'pattern', example?: string): string;
  public msg(key: ErrorKey, a?: number | string, b?: number): string {
    switch (key) {
      case 'between':
        return `El valor introducido debe estar entre ${a} y ${b}.`;
      case 'max':
        return `Se excedió la longitud máxima permitida: ${a}.`;
      case 'min':
        return `El campo no cumple la longitud mínima requerida: ${a}.`;
      case 'exact':
        return `El campo debe tener exactamente ${a} caracteres.`;
      case 'pattern':
        return a ? `El formato no es válido. Ejemplo: ${a}.` : 'El formato no es válido.';
      default:
        return this.messages[key];
    }
  }

  // Si quiere mantener compatibilidad con su código anterior:
  public get generic(): string { return this.messages.generic; }
  public get required(): string { return this.messages.required; }
  public get numeric(): string { return this.messages.numeric; }
  public get betweenDate(): string { return this.messages.betweenDate; }
  public get email(): string { return this.messages.email; }
  public get alphanumeric(): string { return this.messages.alphanumeric; }
  public get textOnly(): string { return this.messages.textOnly; }
  public get curp(): string { return this.messages.curp; }
  public get rfc(): string { return this.messages.rfc; }
  public get passwordMatch(): string { return this.messages.passwordMatch; }
  public get noSpaces(): string { return this.messages.noSpaces; }

}
