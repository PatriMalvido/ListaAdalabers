import '../styles/App.scss';
import callToApi from '../services/api';
import { useEffect, useState } from 'react';

function App() {
  const [student, setStudent] = useState([]); //para guardar los datos devueltos por al API
  const [newStudent, setNewStudent] = useState({
    name: '',
    counselor: '',
    speciality: '',
    social_networks: [],
  });
  const [filterStudent, setFilterStudent] = useState('');
  const [selectedCounselor, setSelectedCounselor] = useState('');

  useEffect(() => {
    callToApi().then((response) => {
      setStudent(response.results);
    });
  }, []);

  //-----------------------------

  const renderStudent = () => {
    return student
      .filter((eachStudent) => {
        return eachStudent.name
          .toLocaleLowerCase()
          .includes(filterStudent.toLocaleLowerCase());
      })
      .filter((eachStudent) => {
        return eachStudent.counselor
          .toLocaleLowerCase()
          .includes(selectedCounselor.toLocaleLowerCase());
      })
      .map((eachStudent, index) => {
        return (
          <tr key={index}>
            <td>{eachStudent.name}</td>
            <td>{eachStudent.counselor}</td>
            <td>{eachStudent.speciality}</td>
            <td key={index}>
              {eachStudent.social_networks.map((eachSocial, index) => (
                <a key={index} href={eachSocial.url}>
                  {' '}
                  {eachSocial.name}
                </a>
              ))}
              ;
            </td>
          </tr>
        );
      });
  };
  //---------------------------------------------

  const handleFilterStudentName = (ev) => {
    setFilterStudent(ev.currentTarget.value);
  };

  //--------------------------------------------

  const handleInput = (ev) => {
    setNewStudent({
      ...newStudent,
      [ev.currentTarget.id]: ev.currentTarget.value,
    });
  };

  //--------------------------------------------------

  const handleClickNew = () => {
    if (newStudent.name !== '') {
      setStudent([...student, newStudent]);
    }

    setNewStudent({
      name: '',
      counselor: '',
      speciality: '',
      social_networks: [],
    });
  };
  //-----------------------------------------------------

  const handleChangeFilterCounselor = (ev) => {
    const selectedCounselorUser = ev.currentTarget.value;
    setSelectedCounselor(selectedCounselorUser);
  };

  return (
    <div>
      <h1>Lista de Adalabers</h1>
      <main>
        <form
          action=""
          onSubmit={(ev) => ev.preventDefault()}
          className="filters"
        >
          <label className="filters__text" htmlFor="name">
            Nombre:
            <input
              onChange={handleFilterStudentName}
              type="text"
              className="input__text"
              name="name"
              id="name"
              placeholder="Ej: MariCarmen"
            />
          </label>
          <label className="filters__text" htmlFor="counselor">
            Escoge una tutora:
            <select
              onChange={handleChangeFilterCounselor}
              className="input__text"
              name="counselor"
              id="counselor"
            >
              <option value="">Cualquiera</option>
              <option value="Yanelis">Yanelis</option>
              <option value="Dayana">Dayana</option>
              <option value="Iván">Iván</option>
            </select>
          </label>
        </form>
        <section className="data">
          <table className="table">
            <thead className="thead">
              <tr>
                <th>Nombre</th>
                <th>Tutora</th>
                <th>Especilidad</th>
                <th>Redes Sociales</th>
              </tr>
            </thead>
            <tbody>{renderStudent()}</tbody>
          </table>
        </section>

        <section className="add">
          <h2 className="add__title">Añadir una adalaber</h2>
          <form action="" onSubmit={(ev) => ev.preventDefault()}>
            <label className="add__label" htmlFor="name">
              Nombre:
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleInput}
                className="input__text"
              />
            </label>
            <label className="add__label" htmlFor="counselor">
              Tutora:
              <input
                type="text"
                name="counselor"
                id="counselor"
                onChange={handleInput}
                className="input__text"
              />
            </label>
            <label className="add__label" htmlFor="speciality">
              Especialidad:
              <input
                type="text"
                name="speciality"
                id="speciality"
                onChange={handleInput}
                className="input__text"
              />
            </label>
            <input
              className="btn"
              onClick={handleClickNew}
              type="submit"
              value="Añadir"
            />
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
