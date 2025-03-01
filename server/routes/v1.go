package routes

import (
	"github.com/gin-gonic/gin"
	"root/handlers"
)

func SetupV1Routes(router *gin.RouterGroup) {
	v1 := router.Group("/v1")
	{
		f1 := v1.Group("/formula1")
		{
			f1.GET("/ping", handlers.Ping)
		}
	}
}