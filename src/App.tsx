import { useState } from 'react';
import styles from './App.module.css';
import powerImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png';
import { GridItem } from "./components/GridItem";

import { levels, calculateImc, Level } from './helpers/imc';

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if (heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert('Digite todos os campos.');
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={powerImage} alt="" width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>
          <input
            type="number" step=".01"
            placeholder="Digite a sua altura. Ex: 1.5 (em métros)"
            value={heightField > 0 ? heightField : ""}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <input
            type="number" step=".01"
            placeholder="Digite o seu peso. Ex: 75.3 (em kg)"
            value={weightField > 0 ? weightField : ""}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key) => (
                //<div key={key}>{item.title}</div>
                <GridItem key={key} item={item} />
              ))}
            </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;