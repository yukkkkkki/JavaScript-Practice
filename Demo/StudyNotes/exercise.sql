-- 方法一：使用 DELETE 和 WHERE 子句
DELETE p1 FROM Person p1, Person p2
WHERE p1.Email = p2.Email AND p1.Id > p2.Id;