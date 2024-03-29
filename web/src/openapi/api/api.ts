export * from './orderEntityController.service';
import { OrderEntityControllerService } from './orderEntityController.service';
export * from './orderPropertyReferenceController.service';
import { OrderPropertyReferenceControllerService } from './orderPropertyReferenceController.service';
export * from './productController.service';
import { ProductControllerService } from './productController.service';
export * from './productEntityController.service';
import { ProductEntityControllerService } from './productEntityController.service';
export * from './productPropertyReferenceController.service';
import { ProductPropertyReferenceControllerService } from './productPropertyReferenceController.service';
export * from './profileController.service';
import { ProfileControllerService } from './profileController.service';
export const APIS = [OrderEntityControllerService, OrderPropertyReferenceControllerService, ProductControllerService, ProductEntityControllerService, ProductPropertyReferenceControllerService, ProfileControllerService];
