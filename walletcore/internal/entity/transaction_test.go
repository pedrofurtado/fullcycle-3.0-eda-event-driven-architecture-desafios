package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateTransaction(t *testing.T) {
	client1, _ := NewClient("Client 1", "1@1.com")
	account1 := NewAccount(client1)
	client2, _ := NewClient("Client 2", "2@2.com")
	account2 := NewAccount(client2)

	account1.Credit(1000)
	account2.Credit(1000)

	transaction, err := NewTransaction(account1, account2, 100)
	assert.Nil(t, err)
	assert.NotNil(t, transaction)
	assert.Equal(t, float64(1100), account2.Balance)
	assert.Equal(t, float64(900), account1.Balance)
}

func TestCreateTransactionWithInsufficientBalance(t *testing.T) {
	client1, _ := NewClient("Client 1", "1@1.com")
	account1 := NewAccount(client1)
	client2, _ := NewClient("Client 2", "2@2.com")
	account2 := NewAccount(client2)

	account1.Credit(1000)
	account2.Credit(1000)

	transaction, err := NewTransaction(account1, account2, 2000)
	assert.NotNil(t, err)
	assert.Error(t, err, "insufficient funds")
	assert.Nil(t, transaction)
	assert.Equal(t, float64(1000), account2.Balance)
	assert.Equal(t, float64(1000), account1.Balance)
}

func TestCreateTransactionWithNegativeBalance(t *testing.T) {
	client1, _ := NewClient("Client 1", "1@1.com")
	account1 := NewAccount(client1)
	client2, _ := NewClient("Client 2", "2@2.com")
	account2 := NewAccount(client2)

	account1.Credit(1000)
	account2.Credit(1000)

	transaction, err := NewTransaction(account1, account2, -2000)
	assert.NotNil(t, err)
	assert.Error(t, err, "amount must be greater than zero")
	assert.Nil(t, transaction)
	assert.Equal(t, float64(1000), account2.Balance)
	assert.Equal(t, float64(1000), account1.Balance)
}
