-- Cancel flow sets status to 'cancelled'; constraint must allow it (was missing after #49).

alter table public.orders drop constraint if exists orders_status_check;

alter table public.orders add constraint orders_status_check
  check (status in (
    'pending',
    'preparing',
    'out_for_delivery',
    'ready_for_pickup',
    'completed',
    'cancelled'
  ));
