import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  VStack
} from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { signUp, clearError } = useActions()
  const { token, error, isError, isLoading } = useTypedSelector(
    (state) => state.auth
  )

  const navigate = useNavigate()

  useEffect(() => {
    token ? navigate('/dashboard') : navigate('/sign-up')
  }, [navigate, token])

  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement
    if (name === 'email') setEmail(value)
    if (name === 'password') setPassword(value)
    if (name === 'confirm-password') setConfirmPassword(value)
  }

  const handleReset = () => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    clearError()
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    signUp(email, password)
  }

  return (
    <Center mt={40}>
      <VStack p={8} borderRadius="md" w={{ sm: '400px' }}>
        <Heading as="h2" size="xl" mb={8}>
          Sign Up
        </Heading>
        <Box w="full">
          <form onSubmit={handleSubmit}>
            <VStack>
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  name="confirm-password"
                  value={confirmPassword}
                  onChange={handleChange}
                />
              </FormControl>
              {password !== confirmPassword && (
                <Alert status="error" borderRadius="md">
                  <AlertIcon />
                  Password must match
                </Alert>
              )}
              {isError && (
                <Alert status="error" borderRadius="md">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
              <Box my={4}>
                <Link to="/sign-in">Already have an account? Sign In</Link>
              </Box>
              <Stack
                direction={['column', 'row']}
                justifyContent="flex-end"
                w="100%"
              >
                <Button
                  colorScheme="teal"
                  isLoading={isLoading}
                  type="reset"
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button
                  colorScheme="teal"
                  isLoading={isLoading}
                  type="submit"
                  onSubmit={handleSubmit}
                >
                  Submit
                </Button>
              </Stack>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Center>
  )
}

export default SignUp
