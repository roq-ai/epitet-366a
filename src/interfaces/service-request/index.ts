import { UserInterface } from 'interfaces/user';
import { WorkOrderInterface } from 'interfaces/work-order';
import { GetQueryInterface } from 'interfaces';

export interface ServiceRequestInterface {
  id?: string;
  description: string;
  client_id: string;
  work_order_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  work_order?: WorkOrderInterface;
  _count?: {};
}

export interface ServiceRequestGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  client_id?: string;
  work_order_id?: string;
}
