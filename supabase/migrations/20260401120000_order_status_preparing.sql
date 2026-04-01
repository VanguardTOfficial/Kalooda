-- Order statuses: pending, preparing, out_for_delivery (replacing assigned/delivered)

update orders set status = 'preparing' where status = 'assigned';
update orders set status = 'out_for_delivery' where status = 'delivered';

alter table orders drop constraint if exists orders_status_check;

alter table orders add constraint orders_status_check
  check (status in ('pending', 'preparing', 'out_for_delivery'));
