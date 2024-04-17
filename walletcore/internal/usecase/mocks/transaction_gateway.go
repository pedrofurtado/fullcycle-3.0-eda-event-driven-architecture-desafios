package mocks

import (
	"github.com/pedrofurtado/fullcycle-3.0-eda-event-driven-architecture-desafios/internal/entity"
	"github.com/stretchr/testify/mock"
)

type TransactionGatewayMock struct {
	mock.Mock
}

func (m *TransactionGatewayMock) Create(transaction *entity.Transaction) error {
	args := m.Called(transaction)
	return args.Error(0)
}
