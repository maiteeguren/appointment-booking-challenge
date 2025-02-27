import { styled } from '@mui/system';

export const SlotWrapper = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    width: 300,
    justifyContent: 'space-between'
});

export const ButtonWrapper = styled('div')({
    padding: 5
});

export const Section = styled('div')({
    marginBottom: 20
})

export const SectionTitle = styled('span')({
    fontWeight: 600,
    marginRight: 5,
})

export const DateWrapper = styled(Section)({
    display: 'flex',
    alignItems: 'center',
    width: 300,
    justifyContent: 'space-between'
});

export const InputWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
});

export const ButtonGroup = styled('div')({
    display: 'flex',
    justifyContent: 'space-evenly'
});

export const AlertsWrapper = styled('div')({
    position: 'absolute',
    top: 20,
    right: 20
})

export const BackButtonWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '3rem'
});