import { clone, trim } from "lodash"
import vocabulariesDataMock from '../vocabulariesData.json'

export function getVocaloriesData() {
    let response = clone(vocabulariesDataMock)
    response = response.map((item: any) => {
        const searchIndex = String(item.sName).search('/')
        if (searchIndex > 0) {
            item.sVerbalSpeak = trim(String(item.sName).substring(0, String(item.sName).search('/')))
            item.sVoid = trim(String(item.sName).substring(String(item.sName).search('/'), item.sName?.length))
            item.sName = trim(String(item.sName).substring(0, String(item.sName).search('/')))
        }
        return item
    })
    return clone(response)
}
