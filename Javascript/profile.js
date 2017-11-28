$(document).ready(() => {

    const studentTable = $("#studentTable");

    SDK.getProfile((err, data) => {
        if (err) throw err;
        const students = JSON.parse(data);

   const studentHTML = `
    <tr>

        <td>${students.firstName}</td>

        <td>${students.lastName}</td>

        <td>${students.email}</td>

      
`;

        studentTable.append(studentHTML);
        });

    });




