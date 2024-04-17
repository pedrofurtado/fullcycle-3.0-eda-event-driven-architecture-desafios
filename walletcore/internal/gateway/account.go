package gateway

import "github.com/pedrofurtado/fullcycle-3.0-eda-event-driven-architecture-desafios/internal/entity"

type AccountGateway interface {
	Save(account *entity.Account) error
	FindById(id string) (*entity.Account, error)
	UpdateBalance(account *entity.Account) error
}
