package gateway

import "github.com/pedrofurtado/fullcycle-3.0-eda-event-driven-architecture-desafios/internal/entity"

type TransactionGateway interface {
	Create(transaction *entity.Transaction) error
}
