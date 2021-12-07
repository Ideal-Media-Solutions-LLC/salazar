## Rest API

### /v1

#### /repos

|Method|path|description|
|----|----|----|
|GET|`/`|Get all repos for the cohort|


#### /status

|Method|path|description|
|----|----|----|
|GET|`/`|Gets status for all published repos|


#### /events

|Method|path|description|
|----|----|----|
|GET|`/`|Get all events for the cohort|

# Additional Examples

### Request Form Data
| Parameter |   Type  | Description | Requirement Type |
| --- | --- | --- | --- |
| list_id | integer | ID of the list that owns the card. | Required |
| name | string | Desired name of the card being created. | Required |
| content | string | Desired content of the card being created. | Optional |

### _Example Request_

```javascript
let formData = new FormData();
formData.append(card["list_id"], 1);
formData.append(card["name"], "My Card");
formData.append(card["content"], "My Content");

fetch(`http://localhost:3000/cards`, {
    credentials: 'include',
    method: 'post',
    body: formData
}).then(response => response.json())
  .then(json => ...);
```

### Response Parameters
| Parameter |   Type  | Description |
| --- | --- | --- |
| card_id | integer | ID of the card that was created. |
| list_id | integer | ID of the list that owns the card. |
| name | string | Name of the card. |
| content | string | Content of the card. |

### _Example Response_

```json
{
	"card_id": 1, "list_id": 1, "name": "My Card", "content": "My Content"
}
```

***

## Index Cards
Shows all cards belonging to a list.

### Authentication
Requires session cookie.

### URL
`GET /cards`

### Request Form Data
| Parameter |   Type  | Description | Requirement Type |
| --- | --- | --- | --- |
| list_id | integer | ID of the list that owns the cards. | Required |

### _Example Request_

```javascript
let formData = new FormData();
formData.append(card["list_id"], 1);

fetch(`http://localhost:3000/cards`, {
    credentials: 'include',
    method: 'get',
    body: formData
}).then(response => response.json())
  .then(json => ...);
```

### Response
| Parameter |   Type  | Description |
| --- | --- | --- |
| card_id | integer | ID of the requested card. |
| list_id | integer | List ID of the requested card. |
| name | string | Name of the requested card. |
| content | string | Content of the requested card. |

### _Example Response_

```json
[
  {
    "card_id": 1,
    "list_id": 1,
    "name": "My Card",
    "content": "My Content"
  },
  {
    "card_id": 2,
    "list_id": 1,
    "name": "My Second Card",
    "content": "My Content"
  }
]
```
