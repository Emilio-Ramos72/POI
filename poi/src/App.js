import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import './inicioSesion.css';
//import styles from'./inicioSesion.css';

function App() {
  return (
    <div className="App" >
      <body>
      <div class="login">
        
        <label>Correo:</label>
        <input type="text" name="Correo" id="Correo" placeholder="Introduzca correo" required>
        </input>

        <label>Contraseña:</label>
        <input type="password" name="Contraseña" id="Contraseña" placeholder="**************" required>
        </input>

        <input id="ER" class="Reg" name="Entrar" type="submit" value="Entrar" >
        </input>
        <hr id="linea"></hr>
        <div class='r'>
            <input class="Reg" name="Registrarse" id="Registrarse" type="button" value="Registrarse" >
            </input>
        </div>

        </div>

      </body>
      
    </div>
  );
}

export default App;
