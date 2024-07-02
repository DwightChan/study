package main

import (
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/pkg/errors"
	"github.com/sirupsen/logrus/hooks/writer"
)


func panicErr(writer http.ResponseWriter,
	request *http.Request) error {
	panic("not implemented")
}

type testError string

func (e testError) Error() string {
	return e.Message()
}

func (e testError) Message() string {
	return string(e)
}

func userError(writer http.ResponseWriter,
	request *http.Request) error {
	return testError("user error")
}

func io404Err(writer http.ResponseWriter,
	request *http.Request) error {
	return os.ErrNotExist
}

func io403Err(writer http.ResponseWriter,
	request *http.Request) error {
	return os.ErrPermission
}

func unknownErr(writer http.ResponseWriter,
	request *http.Request) error {
	return errors.New("unknown error")
}

var tests = []struct {
	name 	 string
	handler appHandler
	expectedMsg string
	expectedCode int
}{
	{"panic", panicErr, "Internal Server Error", 500},
	{"user", userError, "user error", 400},
	{"404", io404Err, "Not Found", 404},
	{"403", io403Err, "Forbidden", 403},
}

func TestErrWrapper(t *testing.T) {
	for _, tt := range tests {
		server := httptest.NewServer(
			http.HandleFunc(
				errWrapper(tt.handler)))
			
		resp, _ := http.Get(server.URL)
		b, _ := ioutil.ReadAll(resp.Body)
	}
}

func errWrapper(i invalid type) {
	panic("unimplemented")
}