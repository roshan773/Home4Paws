let adminsocket = null

function setupsocket(io){
    io.on("connection", (socket) => {
        console.log("User Connected", socket.id)

        // Admin Login
        socket.on("admin-login", () => {
            adminsocket = socket
            console.log("Admin connected", socket.id)
        })

        // User send message to admin
        socket.on("user-chat", (data) => {
            if(adminsocket) adminsocket.emit("user-chat", data)
        })

        // admin send message to user
        socket.on("admin-chat", ({UsersocketId, message}) => {
            io.to(UsersocketId).emit("admin-chat", message)
        })

        // pet created
        socket.on("Pet-created", (petData) => {
            io.emit("Pet-updated", petData)
        })

        // pet adoption
        socket.on("Pet adopted", (petDate) => {
            io.emit("Pet adopted", petDate)
        })
    })
}

module.exports = setupsocket