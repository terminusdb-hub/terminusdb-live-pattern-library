
export function graphStructureFromBindings(bindings) {
    let gs = {}
    for (var i = 0; i < bindings.length; i++) {
        let fid = `${bindings[i]['Graph Type']['@value']}/${bindings[i]['Graph ID']['@value']}`
        gs[fid] = {
            id: bindings[i]['Graph ID']['@value'],
            type: bindings[i]['Graph Type']['@value'],
        }
    }
    return gs
}

export function branchStructureFromBindings(bindings) {
    let brans = {}
    for (var i = 0; i < bindings.length; i++) {
        brans[bindings[i]['Branch ID']['@value']] = {
            id: bindings[i]['Branch ID']['@value'],
            head: bindings[i]['Commit ID']['@value'],
            updated: bindings[i]['Time']['@value'],
        }
    }
    return brans
}