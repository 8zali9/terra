const mq = require('amqplib/callback_api')

const amq_init = (pubsubId, msgOrFun, msgQueueName) => {
    mq.connect('amqp://localhost:5672', (err, conn) => {
        if (err) {
            console.log("Error connecting to the message queue: ", err)
            process.exit(1)
        }

        conn.createChannel((err, ch) => {
            if (err) {
                console.log("Error creating channel: ", err)
                conn.close()
                process.exit(1)
            }

            ch.assertQueue(msgQueueName, { durable: false })

            const date = new Date()
            if (pubsubId === "pub") {
                const message = JSON.stringify(msgOrFun)
                ch.sendToQueue(msgQueueName, Buffer.from(message))
            } else {
                ch.consume(msgQueueName, (receivedMsg) => {
                    const message = receivedMsg.content.toString()
                    msgOrFun(message)
                    ch.ack(receivedMsg)
                })
            }
        })
    })
}

module.exports = { amq_init }