export class UpdatePartDto {
  cod: String;
  description: String;
  unit: String;
  distributionValue: Number;
  storeValue: Number;
  cost: Number;
  updatedAt: Date;
  hidden: Boolean;
}

export class CreatePartDto {
  cod: String;
  description: String;
  unit: String;
  distributionValue: Number;
  storeValue: Number;
  cost: Number;
  createdAt: Date;
  updatedAt: Date;
  hidden: Boolean;
}
