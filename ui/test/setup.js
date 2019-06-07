import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import 'jest-styled-components' // styled components snapshot serializer
import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()})
