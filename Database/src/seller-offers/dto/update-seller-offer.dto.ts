import { PartialType } from '@nestjs/mapped-types';
import { CreateSellerOfferDto } from './create-seller-offer.dto';

export class UpdateSellerOfferDto extends PartialType(CreateSellerOfferDto) {
  closed?: boolean | null;
}
