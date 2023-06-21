// import {applyQueryToArray} from '@mossaic-ui/widgets';

describe('applyQueryToArray', () => {
    // TODO Разобраться почему не проходит тест
    xit('contains operator should ignore falsy values', () => {
        const data = [
            {
                name: 'test',
            },
            {
                name: null,
            },
            {
                name: '',
            },
            {
                name: undefined,
            },
        ];
        // const res = applyQueryToArray(
        //   data,
        //   [
        //     {
        //       fieldId: 'name',
        //       value: 'test',
        //       op: 'contains',
        //       type: 'condition',
        //     },
        //   ],
        //   []
        // );
        // expect(res).toEqual([
        //   {
        //     name: 'test',
        //   },
        // ]);
    });
});
