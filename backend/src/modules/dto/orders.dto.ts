export class CreatePartOrderDTO {
  partId: string;
  quantidade: number;
  statusItem: 'OP' | 'ESTOQUE';
  precoUnitario : number;
  hidden: Boolean;
}

export class CreateOrderDTO {
  numeroPedido: string;
  customerId: string;
  prazoEntrega?: Date;
  status: 'OK' | 'PENDENTE' | 'CANCELADO';
  valorTotal: number;
  observacoes?: string;
  marca: string;
  parts: CreatePartOrderDTO[];
  createdAt: Date;
  updatedAt: Date;
  hidden: Boolean;
}

export class UpdatePartOrderDTO {
  partId: string;
  quantidade: number;
  unidade: string;
  statusItem: 'OP' | 'ESTOQUE';
  precoUnitario?: number;
  hidden: Boolean;
}

export class UpdateOrderDTO {
  numeroPedido: string;
  customerId: string;
  prazoEntrega?: Date;
  status: 'OK' | 'PENDENTE' | 'CANCELADO';
  valorTotal: number;
  observacoes?: string;
  marca: string;
  itens: CreatePartOrderDTO[];
  updatedAt: Date;
  hidden: Boolean;
}