export class UpdateCustomerDto {
  name: String;
  address: String;
  district: String;
  city: String;
  state: String;
  cep: String;
  cnpj: String;
  ie: String;
  phone: String;
  seller: String;
  updatedAt: Date;
  hidden: Boolean;
}

export class CreateCustomerDto {
  name: String;
  address: String;
  district: String;
  city: String;
  state: String;
  cep: String;
  cnpj: String;
  ie: String;
  phone: String;
  seller: String;
  createdAt: Date;
  updatedAt: Date;
  hidden: Boolean;
}
