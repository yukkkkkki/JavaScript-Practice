-- 方法一：使用 GROUP BY 和临时表
select Email from
(
  select Email, count(Email) as num
  from Person
  group by Email
) as statistic
where num > 1;

-- 方法二：使用 GROUP BY 和 HAVING 条件
select Email
from Person
group by Email
having count(Email) > 1;