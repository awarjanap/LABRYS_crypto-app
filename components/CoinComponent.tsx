import React from "react";
import { Td, Image, background } from '@chakra-ui/react';
import { Stat, StatArrow, StatGroup} from '@chakra-ui/react';
import { Tag } from '@chakra-ui/react';
import { Box } from "@chakra-ui/react";


const leftCellStyle = {
    borderColor:'transparent',
    borderTopLeftRadius: '7px 7px',
    borderBottomLeftRadius: '7px 7px'
};

const MidCellStyle = {
    borderColor: 'transparent'
}
  
const rightCellStyle = {
    borderColor:'transparent',
    borderTopRightRadius: '7px 7px',
    borderBottomRightRadius: '7px 7px'
};
  

const CoinComponent = ({ id, symbol, value, price, change }: {id:number , symbol:String, value: any,price:string, change:number}) => {


    return (
        <>
            <Td color='white' padding="16px 10px 16px 50px" bg='#2F2E2E' fontSize='11px' textAlign='left' sx={leftCellStyle} fontFamily='Inter'>#{id} </Td>

            <Td bg='#2F2E2E' padding="16px 0px 16px 0px" sx={MidCellStyle}>
                <Image borderRadius='full' boxSize='40px' m='0px 0px 0px 20px'
                    src={`icons/${symbol.toLowerCase()}.svg`} alignSelf='right' 
                    onError={(e) => {
                        const ImgSrc = e.target as HTMLImageElement
                        ImgSrc.src = 'icons/No-img.svg';
                    }} /></Td>
            
            <Td bg='#2F2E2E' padding="16px 0px 16px 0px" color='white' fontFamily='Inter' fontSize='14px' textAlign='left' sx={MidCellStyle}>{symbol} <br />
                <Box fontSize= '11px' color='#707070' m ='3px 0px 0px 0px'>{((value) * (Math.pow(10, -9))).toFixed(2)} Bn </Box></Td>

            <Td bg='#2F2E2E' padding="16px 60px 16px 0px" color='white' fontFamily='Inter' fontSize='12px' textAlign='right' sx={MidCellStyle}>  $ {(parseFloat(price).toFixed(2))}</Td>

            <Td bg='#2F2E2E' fontFamily='Inter' fontSize="10px" sx={rightCellStyle} padding="16px 50px 16px 0px" textAlign='center' >
                <StatGroup>
                    <Stat>
                        <>
                            {change >= 0 ?
                                <Tag size='md' fontSize='10px' bg='#24FF0010' color='#24FF00'><StatArrow type='increase' color='#24FF00' />{Math.abs(change).toFixed(2)}%</Tag> : <Tag size='md' fontSize='10px'bg='#FF000010' textColor='#FF0000'><StatArrow type='decrease' color='#FF0000' />{Math.abs(change).toFixed(2)}%</Tag>
                            }
                        </>                               
                    </Stat>
                </StatGroup></Td>
        </>
    );
}
export default CoinComponent;
