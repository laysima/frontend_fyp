"use client";
import {Text, Input, Box, FormControl, FormLabel, FormHelperText, Button, Link, Flex, InputRightElement,InputGroup,
Image, useToast,} from "@chakra-ui/react";

import { Controller, useForm } from "react-hook-form";

import {zodResolver} from '@hookform/resolvers/zod'

import { FaAngleRight, FaArrowRight } from "react-icons/fa";

import { BsEye, BsEyeSlash } from "react-icons/bs";

// import Link from 'next/link'
import { useEffect, useState } from "react";
import NextLink from "next/link";

import React from "react";
import { LoginSchema, LoginType } from "@/schemas";
import { LoginUser } from "@/app/api";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";

const login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast()
  const router = useRouter();
  const session  = getCookie('session');

  const [loading, setLoading] = useState(false);
  useEffect(()=> {
    if (session) {
      router.replace('/')
    }
  },[]) 
  
  //reat hook forms

    const { control, handleSubmit, formState: { errors },} = useForm<LoginType>
    (
      {
        resolver:zodResolver(LoginSchema)
      }
    )

  const onSubmit = async (payload:LoginType) => {
    setLoading(true)


    console.log('payload', payload)
    
    try {
    const data = await LoginUser(payload)
    if (data) {
      setCookie('session', JSON.stringify(data))
      router.replace('/')
    }
     toast({
      title: 'Success',
      status: 'success',
      isClosable: true,
    })
    setLoading(false)
    } 
    catch (e:any) {
      toast({
        title: e.message,
        status: 'error',
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Box
        bgImage={"url('./hexagon.jpg')"}
        width={"full"}
        h={"100vh"}
        bgSize={"cover"}
        objectFit={"cover"}
        bgRepeat={"no-repeat"}
      >
        {/* <Flex justify={"center"} w={"full"}>
          <Box w={"200px"} mt={"60px"}>
            <Image objectFit={"cover"} src="pharmainc.svg"></Image>
          </Box>
        </Flex> */}

        <Flex justify={"center"} w={"full"} mt={5} mb={10}>
          <FormControl
            w={"30rem"}
            boxShadow={"1px 1px 8px 5px #EAEFF2, 0 0 10px #EAEFF2"}
            p={"62px 28px"}
            borderRadius={7}
          >
            <Flex textAlign={"center"} direction={"column"} gap={1}>
              <Text
                fontWeight={500}
                color={"#0881DE"}
                fontFamily={'"Outfit", sans-serif'}
                fontSize={"3xl"}
              >
                Sign In
              </Text>
              <Text>Welcome Back! Please enter your details</Text>
            </Flex>

            <Flex mt={10} direction={"column"} w={"full"} align={"center"}>
              <Flex direction={"column"} align={"start"} w={"full"}>
                <FormLabel>Username</FormLabel>
                <Controller 
                  control={control}
                  name={"username"}
                  render={({ field }) => (
                    <Input
                    variant={'flushed'} bg={'#F0F8FF'}
                    type="text"
                    p={2}
                    placeholder="example"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  )}
                />              
                <FormHelperText color={errors.username? 'red' : ''}>
                  { errors.username ? errors.username.message: 'Please Enter Your Username'}
                </FormHelperText>
              </Flex>
            </Flex>

            <Flex mt={8} direction={"column"} w={"full"} align={"center"}>
              <Flex direction={"column"} align={"start"} w={"full"}>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Controller
                  control={control}
                  name={"password"}
                  render={({field}) => (
                    <Input
                     variant={'flushed'} bg={'#F0F8FF'}
                      pr="4.5rem"
                      placeholder="*****"
                      p={2}
                      type={show ? "text" : "password"}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                  
                  />
                  <InputRightElement width="4.5rem">
                    <button
                      style={{
                        height: "1.75rem",
                        fontSize: "m",
                        backgroundColor: "none",
                      }}
                      onClick={handleClick}
                    >
                      {show ? <BsEye /> : <BsEyeSlash />}
                    </button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText color={errors.password? 'red' : ''}>
                  { errors.password ? errors.password.message: 'Please Enter Your Password'}
                  </FormHelperText>
              </Flex>
            </Flex>

            <Flex justify={"center"} mt={10}>
              <button
              onClick={handleSubmit(onSubmit)}
                style={{
                  background: "#0881DE",
                  padding: "10px",
                  borderRadius: "7px",
                  color: "white",
                  width: "60%",
                }}
              >
                {loading? 'Signing In.....':  "Sign In"}
              </button>
            </Flex>

            <Flex justify={"center"} mt={10}>
              <Text> Dont have an Account?</Text>
              <Link
                as={NextLink}
                href="/signup"
                _hover={{
                  color: "#0881DE",
                  transition: "0.5s",
                  cursor: "pointer",
                  fontWeight: 200,
                }}
              >
                <Text> SignUp</Text>
              </Link>
            </Flex>
          </FormControl>
        </Flex>
      </Box>
    </>
  );
};

export default login;
