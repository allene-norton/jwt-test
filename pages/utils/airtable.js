import {gbBase, gbTable} from './constants'

// init Airtable and base
const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(gbBase.naBaseId);

// init tables
const studentsTable = base(gbTable.students.tableName)

// get all students and map fields

export async function getStudents(clientName) {
    let studentsArr = []

    const records = await studentsTable.select({
        // Selecting the record with matching full name
        maxRecords: 150,
        view: "Grid view",
        filterByFormula: `{School Owner (from Gracie Barra Location)} = "${clientName}"`
    }).firstPage()
    
    // console.log(records)
    records.forEach(record => studentsArr.push({
        name: record.fields.Student,
        recordId: record.id
    }))

    return studentsArr
}