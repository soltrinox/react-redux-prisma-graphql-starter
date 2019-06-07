import React from 'react'
import {NavLink} from 'react-router-dom'
import {Field, propTypes, reduxForm} from 'redux-form'
import {Form, Input, Button, notification} from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {useActions, useStore} from 'easy-peasy'

import ButtonUI from '../UI/Button'
import PlatformLogo from '../../layouts/PlatformLogo'
import Error from '../ErrorMessage'

const FormItem = Form.Item

const SignUpForm = props => {
  const {handleSubmit} = props
  const {error, loading} = useStore(store => store.auth)
  const form = useStore(store => store.form)
  const signup = useActions(actions => actions.auth.signup)
  const settings = useStore(store => {
    return store.settings.list
  })
  const registrationsEnabled = settings.find(
    s => s.key === 'registrationsEnabled'
  )
  const invitationsOnly = settings.find(s => s.key === 'invitationsOnly')
  return (
    <SignUpStyles>
      <Error error={error} />
      <main>
        <section className="logo">
          <div className="logo-bg">
            <img
              src="https://cdn.singulart.com/artworks/pictures/cropped/86/56/zoom/serie_56_2224f402f1a55b4db735a09d91fcafe5.jpeg"
              alt="casa-de-papel"
            />
          </div>
        </section>
        <section className="login">
          <fieldset disabled={registrationsEnabled.value === 'false'}>
            <header>
              <img
                src="https://2019.pentestcyprus.org/images/pentest-logo.svg"
                alt=""
                style={{width: 200}}
              />
            </header>
            <Form
              onSubmit={e => {
                e.preventDefault()
                signup(form.signup.values)
              }}
            >
              <FormItem>
                <Field
                  name="nickname"
                  component="input"
                  type="text"
                  placeholder="Nickname"
                  required
                />
              </FormItem>

              <FormItem>
                <Field
                  name="email"
                  component="input"
                  type="email"
                  placeholder="Email"
                  required
                />
              </FormItem>

              <FormItem>
                <Field
                  name="password"
                  component="input"
                  type="password"
                  placeholder="Password"
                  required
                />
              </FormItem>

              {invitationsOnly.value === 'true' && (
                <FormItem>
                  <Field
                    name="invitation"
                    component="input"
                    type="text"
                    placeholder="Invitation code"
                    required
                  />
                </FormItem>
              )}

              <FormItem>
                <ButtonUI
                  loading={loading}
                  disabled={loading}
                  type="primary"
                  htmlType="submit"
                  className="submit-btn"
                >
                  Sign up
                </ButtonUI>
              </FormItem>
            </Form>

            <NavLink to="/signin" className="already-have-account">
              Already have an account? Sign in
            </NavLink>
          </fieldset>

          <div className="logo-content">
            <PlatformLogo />
          </div>

          {registrationsEnabled === 'false' && (
            <p style={{textAlign: 'center'}}>Registrations are disabled.</p>
          )}
        </section>
      </main>
    </SignUpStyles>
  )
}

SignUpForm.propTypes = propTypes

export default reduxForm({
  form: 'signup'
})(SignUpForm)

const SignUpStyles = styled.div`
  max-width: 700px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;

  .already-have-account {
    color: #ededed;
    font-size: 12px;
  }

  main {
    background-color: #434f5a;
    border-radius: 10px;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.03);
    margin-top: 20px;
    min-height: 390px;
    max-height: 590px;
    display: flex;
    height: 100%;

    section.logo {
      padding: 35px 35px 20px;
      width: 40%;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;

      .logo-bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          z-index: 1;
          right: 0;
          bottom: 0;
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
          background-color: rgba(3, 143, 222, 0.1);
        }

        img {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
          width: 100%;
          height: 100%;
        }
      }
    }

    section.login {
      padding: 35px 35px 20px;
      width: 60%;

      header {
        position: relative;
        z-index: 2;
        margin-bottom: 11px;
        color: #e0e0e0;

        h1 {
          font-size: 22px;
          color: #e0e0e0;
          display: flex;
          align-items: center;
        }
      }

      input {
        background-color: rgba(250, 250, 250, 0.1) !important;
        border-color: rgba(250, 250, 250, 0.1);
        color: #e0e0e0;
        border-radius: 6px;
        height: 36px;
        font-size: 14px;
      }

      .logo-content {
        position: relative;
        z-index: 2;
        display: flex;
        justify-content: flex-end;
        margin-left: -20px;
      }
    }
  }
`
