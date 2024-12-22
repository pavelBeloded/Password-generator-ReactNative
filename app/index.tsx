import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from "react-native";
import { Formik } from 'formik';
import BouncyCheckbox from "react-native-bouncy-checkbox";
//Form validation
import * as Yup from 'yup'


const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 characters')
    .max(20, 'Should be max of 20 characters')
    .required('Length is required')
})

export default function Index() {

  const [password, setPassword] = useState('')
  const [isPassGenerated, setIsPassGenerated] = useState(false)

  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const generatePasswordString = (passwordLength: number) => {
    let characterList = ''

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'
    const digitChars = '0123456789'
    const specialChars = '!@#$%^&*()_+'

    if (upperCase) {
      characterList += upperCaseChars
    }
    if (lowerCase) {
      characterList += lowerCaseChars
    }
    if (numbers) {
      characterList += digitChars
    }
    if (symbols) {
      characterList += specialChars
    }

    const passwordResult = createPassword(characterList, passwordLength)
    setPassword(passwordResult)
    setIsPassGenerated(true)
  }

  const createPassword = (characters: string, passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }
    return result
  }
  const resetPassword = () => {
    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
      initialValues={{ passwordLength: '' }}
      validationSchema={PasswordSchema}
      onSubmit={ values => {
        console.log(values)
        generatePasswordString(+values.passwordLength)
      }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
         <>
          <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {touched.passwordLength && errors.passwordLength ? <Text style={styles.errorText}>{errors.passwordLength}</Text> : null}
          </View>
          <TextInput
            style={styles.inputStyle}
            value={values.passwordLength}
            onChangeText={handleChange('passwordLength')}
            placeholder="Ex. 8"
            keyboardType="numeric"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include lowerCase</Text>
            <BouncyCheckbox
            isChecked={lowerCase}
            onPress={()=> setLowerCase(!lowerCase)}
            fillColor="#29AB87"
            />
          </View>
          <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include upperCase</Text>
            <BouncyCheckbox
            isChecked={upperCase}
            onPress={()=> setUpperCase(!upperCase)}
            fillColor="#a229ab"
            />
          </View>
          <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include numbers</Text>
            <BouncyCheckbox
            isChecked={numbers}
            onPress={()=> setNumbers(!numbers)}
            fillColor="#ab5b29"
            />
          </View>
          <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include symbols</Text>
            <BouncyCheckbox
            isChecked={symbols}
            onPress={()=> setSymbols(!symbols)}
            fillColor="#296cab"
            />
          </View>

          <View style={styles.formActions}>
            <TouchableOpacity
            disabled={!isValid}
            style={[styles.primaryBtn, styles.actionBtn]}
            onPress={()=> {handleSubmit()}}
            >
              <Text style={styles.primaryBtnText}>Generate password</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={[styles.secondaryBtn, styles.actionBtn]}
            onPress={()=>{
              handleReset()
              resetPassword()
            }}
            >
              <Text style={styles.secondaryBtnText}>Reset</Text>
            </TouchableOpacity>
          </View>
         </>
       )}
          </Formik>
        </View>
        {isPassGenerated ? (
          <View style={[styles.resultContainer, styles.cardElevated]}>
            <Text style={styles.resultTitle}>Result: </Text>

            <Text selectable={true} style={styles.resultText}>{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer : {
    // flex: 1,
  },
  formContainer: {
    // flex: 1,
    padding: 20,
  },
  title : {
    fontWeight: 500,
    fontSize: 24,
    marginBottom: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
    marginBottom: 10,
  },
  heading:{
    fontSize: 18,
  },
  errorText : {
    fontWeight: 300,
    fontSize: 12,
    color: 'red',
  },
  inputColumn : {

  },
  inputStyle : {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 6,
    width: "30%",
    height: 40,
    textAlign: 'center',
  },
  formActions : {
    flexDirection: 'row',
    padding: 1,
    justifyContent: 'space-evenly'
  },
  actionBtn: {
    width: '30%',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 6,
  },
  primaryBtn: {
    backgroundColor: '#7f74b3',
  },
  primaryBtnText : {
    textAlign: 'center',
    color: "#fff"
  },
  secondaryBtn:{
    backgroundColor: '#b37474',
  },
  secondaryBtnText: {
    textAlign: 'center',
    color: "#fff"

  },
  cardElevated: {
    backgroundColor: '#fff',
    elevation: 3,
    shadowOffset : {
      height: 1,
      width: 1,
    }
  },
  resultContainer :{
    marginHorizontal: 'auto',
    width: '90%',
    padding: 25,
    borderRadius: 6,
  },
  resultTitle: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 22,

  },
  resultText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 26,
  }

})
