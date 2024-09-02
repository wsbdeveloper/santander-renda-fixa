curl --request POST \
  --url http://localhost:9443/api/customer \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/9.3.3' \
  --data '{
  "clientId": 2,
  "id": 100,
	"document": "44433322245",
	"annualIncome": 20000,
	"type": "PF",
	"address": {
		"street": "Rua joao",
    "number": "123",
    "city": "São Paulo",
    "state": "SP",
    "postalCode": "01234-567",
    "country": "Brasil"
	},
  "product": {
    "id": 101,
    "name": "Produto Exemplo",
    "productType": "RF-01",
    "minIncome": 50000,
    "maxInvestmentPercentage": 10
  }
}'


curl --request POST \
  --url http://localhost:9443/api/customer \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/9.3.3' \
  --data '{
  "clientId": 2,
  "id": 101,
	"document": "83.282.046/0001-78",
	"annualIncome": 20000,
	"type": "PJ",
	"address": {
		"street": "Rua joao 2",
    "number": "123",
    "city": "São Paulo",
    "state": "SP",
    "postalCode": "01234-567",
    "country": "Brasil"
	},
  "product": {
    "id": 101,
    "name": "Produto Exemplo",
    "productType": "RF-02",
    "minIncome": 50000,
    "maxInvestmentPercentage": 10
  }
}'
