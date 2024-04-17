package gateway

import "github.com/pedrofurtado/fullcycle-3.0-eda-event-driven-architecture-desafios/internal/entity"

type ClientGateway interface {
	Get(id string) (*entity.Client, error)
	Save(client *entity.Client) error
}
