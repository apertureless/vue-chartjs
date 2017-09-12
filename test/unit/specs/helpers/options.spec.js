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

  const an = {
    a: {
      a: 'a'
    },
    b: {
      b: 'a'
    }
  }

  const bn = {
    a: {
      a: 'a'
    },
    b: {
      b: 'b'
    }
  }

  it('should replace old a and b if a and b are new', () => {
    const ab = mergeOptions(a, b)
    expect(ab).to.have.property('a').and.to.equal('b')
    expect(ab).to.have.property('b').and.to.equal('b')
  })

  it('should add c if c is new', () => {
    const ac = mergeOptions(a, c)
    expect(ac).to.have.property('a').and.to.equal('b')
    expect(ac).to.have.property('b').and.to.equal('b')
    expect(ac).to.have.property('c').and.to.equal('c')
  })

  it('should replace old a and b if a and b are new in nested objects', () => {
    const ab = mergeOptions(an, bn)
    expect(ab).to.have.deep.property('a.a').and.to.equal('a')
    expect(ab).to.have.deep.property('b.b').and.to.equal('b')
  })
})
