-- Issue #49: terminal completed + pickup ready_for_pickup

alter table public.orders drop constraint if exists orders_status_check;

alter table public.orders add constraint orders_status_check
  check (status in (
    'pending',
    'preparing',
    'out_for_delivery',
    'ready_for_pickup',
    'completed'
  ));
