import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleInput = (value) => {
    if (input.length >= 20) return;
    if (value === '.' && input.slice(-1) === '.') return;
    setInput((prev) => prev + value);
  };

  const calculate = () => {
    try {
      console.log("Input actual: ", input);

      if (input.includes('/0')) {
        alert('Error, División entre 0 indeterminada');
        return;
      }

      const openParentheses = (input.match(/\(/g) || []).length;
      const closeParentheses = (input.match(/\)/g) || []).length;

      let expression = input;
      if (openParentheses > closeParentheses) {
        expression += ')'.repeat(openParentheses - closeParentheses);
      }

      console.log("Expresión corregida: ", expression);

      expression = expression
        .replace(/\^/g, '**')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(') // Logaritmo natural (ln)
        .replace(/sin\((\d+(\.\d+)?)\)/g, (match, p1) => Math.sin(`${p1 * (Math.PI / 180)}`))
        .replace(/cos\((\d+(\.\d+)?)\)/g, (match, p1) => Math.cos(`${p1 * (Math.PI / 180)}`))
        .replace(/tan\((\d+(\.\d+)?)\)/g, (match, p1) => Math.tan(`${p1 * (Math.PI / 180)}`))
        .replace(/√(\d+(\.\d+)?)/g, (match, p1) => `Math.sqrt(${p1})`) // Reemplazo de símbolo de raíz cuadrada
        .replace(/π/g, 'Math.PI') // Reemplazo de pi (π)
        .replace(/e/g, 'Math.E'); // Reemplazo de número e

      console.log("Expresión antes de evaluar: ", expression);

      if (expression.match(/Math\.sqrt\(-\d+\)/) || expression.match(/Math\.log10\(-\d+\)/)) {
        alert('Error, Logaritmo o raíz de números negativos');
        return;
      }

      const evaluatedResult = eval(expression); // Evaluar la expresión
      console.log("Resultado evaluado: ", evaluatedResult);
      setResult(evaluatedResult.toString());

    } catch (error) {
      console.error('Error de cálculo: ', error);
      alert('Error, Operación no válida');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.result}>{result || '0'}</Text>
      <Text style={styles.input}>{input || '0'}</Text>

      <View style={styles.row}>
        <TouchableOpacity onPress={clearInput} style={[styles.button, styles.primaryButton]}>
          <Text style={[styles.buttonText, styles.primaryButtonText]}>C</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleInput('^')} style={styles.button}>
          <Text style={styles.buttonText}>x^</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleInput('√')} style={styles.button}>
          <Text style={styles.buttonText}>√</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleInput('log(')} style={styles.button}>
          <Text style={styles.buttonText}>log</Text>
        </TouchableOpacity>
      </View>

      {/* Nueva fila de botones agregados */}
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleInput('π')} style={styles.button}>
          <Text style={styles.buttonText}>π</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleInput('e')} style={styles.button}>
          <Text style={styles.buttonText}>e</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleInput('(')} style={styles.button}>
          <Text style={styles.buttonText}>(</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleInput(')')} style={styles.button}>
          <Text style={styles.buttonText}>)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleInput('sin(')} style={styles.button}>
          <Text style={styles.buttonText}>sin</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleInput('cos(')} style={styles.button}>
          <Text style={styles.buttonText}>cos</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleInput('tan(')} style={styles.button}>
          <Text style={styles.buttonText}>tan</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleInput('/')} style={styles.button}>
          <Text style={styles.buttonText}>%</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleInput('1')} style={styles.button}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleInput('2')} style={styles.button}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleInput('3')} style={styles.button}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleInput('*')} style={styles.button}>
          <Text style={styles.buttonText}>x</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleInput('4')} style={styles.button}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleInput('5')} style={styles.button}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleInput('6')} style={styles.button}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleInput('-')} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleInput('7')} style={styles.button}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleInput('8')} style={styles.button}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleInput('9')} style={styles.button}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleInput('+')} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleInput('0')} style={[styles.button, styles.zeroButton]}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleInput('.')} style={styles.button}>
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={calculate} style={[styles.button, styles.primaryButton]}>
          <Text style={[styles.buttonText, styles.primaryButtonText]}>=</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    color: '#FFFFFF',
    fontSize: 36,
    textAlign: 'right',
    marginBottom: 20,
    fontFamily: 'Roboto',
  },
  result: {
    color: '#61dafb',
    fontSize: 55,
    textAlign: 'right',
    marginBottom: 10,
    fontFamily: 'Roboto',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3b3f44',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'Roboto',
  },
  primaryButton: {
    backgroundColor: '#61dafb',
  },
  primaryButtonText: {
    color: '#282c34',
  },
  zeroButton: {
    flex: 2,
  },
});


