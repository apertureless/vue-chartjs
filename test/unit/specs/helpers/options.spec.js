import { mergeOptions } from 'src/helpers/options'

describe('mergeOptions.js', () => {
  const a = {
    a: 'a',
    b: 'a'
  }

  const b = {
    a: 'b',
    b: 'b'
  }

  const c = {
    c: 'c'
  }

  it('should replace old a and b if a and b are new', () => {
    let ab = mergeOptions(a, b)
    expect(ab).to.have.property('a').and.to.equal('b')
    expect(ab).to.have.property('b').and.to.equal('b')
  })

  it('should add c if c is new', () => {
    let ac = mergeOptions(a, c)
    expect(ac).to.have.property('a').and.to.equal('a')
    expect(ac).to.have.property('b').and.to.equal('a')
    expect(ac).to.have.property('c').and.to.equal('c')
  })
})
