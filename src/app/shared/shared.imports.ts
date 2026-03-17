import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Elementos de angular material
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';

/* Formularios */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { NgxMaskDirective } from 'ngx-mask';

export const SHARED_IMPORTS = [
  CommonModule,
  FormsModule,

  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatCheckboxModule,
  MatSidenavModule,

  NgxMaskDirective,
]as const;
