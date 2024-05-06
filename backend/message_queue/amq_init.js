const mq = require('amqplib/callback_api')

const amq_init = (pubsubId, msg, msgQueueName) => {
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
                ch.sendToQueue(msgQueueName, Buffer.from(msg))
                console.log(`Published at : ${date.getTime}`, msg)
            } else {
                ch.consume(msgQueueName, (receivedEvent) => {
                    console.log(`Received at ${date.getTime}`, receivedEvent)
                })
            }
        })
    })
}

module.exports = { amq_init }