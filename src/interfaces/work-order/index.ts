import { ServiceRequestInterface } from 'interfaces/service-request';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface WorkOrderInterface {
  id?: string;
  status: string;
  client_id: string;
  field_technician_id?: string;
  team_leader_id?: string;
  created_at?: any;
  updated_at?: any;
  service_request?: ServiceRequestInterface[];
  user_work_order_client_idTouser?: UserInterface;
  user_work_order_field_technician_idTouser?: UserInterface;
  user_work_order_team_leader_idTouser?: UserInterface;
  _count?: {
    service_request?: number;
  };
}

export interface WorkOrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  client_id?: string;
  field_technician_id?: string;
  team_leader_id?: string;
}
