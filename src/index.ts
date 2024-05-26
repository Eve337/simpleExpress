const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

import { app } from './app'

app.listen(PORT, () => {
    console.log('...server started in port ' + PORT)
})