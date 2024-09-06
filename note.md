A/ Setup Base API:

1/ Handle request:
- Recieve request: header, path variables, query params, body (json, text, form data)
  -> Parsing data => Body text => JSON
  -> Dispatching (Routing) -> chỉ định thằng handle cái xử lý
- Pre-handling/Pre-excute:
  -> Run middleware
  -> Validation
- Run main logic
  -> 1-tier/2-tier/3-tier
  -> Post-handling/Post-execute:
  -> Manipluation response body hoặc header code
  -> Handle exception

2/ Main logic: 2-tier

	-> Controler: handle request + validation + makeing response
	-> Service: Handle transaction + main logic + main flow
	-> Repository: Access data source: database, file, cache
		-> Manager/Caller: call những thằng API khác


3/ Data access library: Prisma - ORM
- Migration + seeding
- ORM objects
- Excute query + command (select, excute)
- Object base/ Raw Query
- Transaction


B/ Authentication & Authorization:

	- JWT Authentication: JSON Website token
	- SSO Integration: AWS Cognito 
	- Authorization: Tuỳ thuộc vào framework hỗ trợ


C/ Testing:

1/ Unit testing -> test cho từng tiers: controller, services, repository

2/ e-2-e (End-to-End) testing: giả lập call APIs

3/ BDD (Nằm ngoài framework): Cucumber hay là postman


User -> Role (MASTER | OWNER | USER)

---> Unit - Object

