const mapping: Record<string, string> = {
  companies: 'company',
  'service-requests': 'service_request',
  users: 'user',
  'work-orders': 'work_order',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
